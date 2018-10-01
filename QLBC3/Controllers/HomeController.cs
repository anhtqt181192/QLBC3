using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QLBC3.App_Data.Database;
using QLBC3.App_Data.Database.Models;
using QLBC3.Data;
using QLBC3.Models;

namespace QLBC3.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private ApplicationDbContext context;

        public HomeController(ApplicationDbContext _context)
        {
            context = _context;
        }

        public IActionResult Index()
        {
            ViewBag.Trip = context.Trip.ToList();

            //OLD
            ViewBag.wareHouse = context.WareHouse.ToList();
            ViewBag.Invoice = context.Invoice.Where(c => c.TypeInvoice == 0).ToList();
            ViewBag.Invoice2 = context.Invoice.Where(c => c.TypeInvoice == 2).ToList();
            ViewBag.Capital1 = context.Capital.Where(c => c.Id == 1).FirstOrDefault().Amount;
            ViewBag.Capital2 = 0 - context.WareHouse.Select(c => c.Amount).Sum();

            decimal tienloi = 0;
            var xuathang = context.Invoice.Where(c => c.TypeInvoice == 2).GroupBy(c => c.IdCategorize).Select(c => new { IdCategorize = c.First().IdCategorize, Unit = c.Sum(i => i.SoLuong), TongTien = c.Sum(j => j.TongTien) }).ToList();
            foreach (var item in xuathang)
            {
                decimal dongia = context.WareHouse.Where(c => c.IdCategorize == item.IdCategorize).FirstOrDefault().AVEPrice;
                tienloi += item.TongTien - (dongia * item.Unit);
            }

            ViewBag.tienloi = tienloi.ToString("N0");
            return View();
        }

        #region OLD

        [HttpGet]
        public IActionResult In()
        {
            List<Categorize> categorizes = context.Categorize.ToList();
            ViewBag.categorizes = categorizes;
            return View();
        }

        [HttpPost]
        public IActionResult In(InvoiceModels invoiceModels)
        {
            context.Invoice.Add(new Invoice {
                TypeInvoice = invoiceModels.TypeInvoice,
                IdCategorize = invoiceModels.IdCategorize,
                NameCategorize = invoiceModels.NameCategorize,
                IdCustomer = invoiceModels.IdCustomer,
                SoLuong = invoiceModels.SoLuong,
                TongTien = invoiceModels.TongTien,
                PhatSinh = invoiceModels.PhatSinh,
                DateCreate = DateTime.Now,
                Note = invoiceModels.Note,
            });
            WareHouse wareHouse = context.WareHouse.Where(c => c.IdCategorize == invoiceModels.IdCategorize).FirstOrDefault();
            if (wareHouse == null)
            {
                wareHouse = new WareHouse {
                    IdCategorize = invoiceModels.IdCategorize,
                    NameCategorize = invoiceModels.NameCategorize,
                    Unit = invoiceModels.SoLuong,
                    Amount = invoiceModels.TongTien,
                    AVEPrice = invoiceModels.TongTien / invoiceModels.SoLuong,
                    DateUpdate = DateTime.Now,
                    Note = invoiceModels.Note,
                };

                context.WareHouse.Add(wareHouse);
            }
            else
            {
                List<Invoice> HangNhap = context.Invoice.Where(c => c.TypeInvoice == 0 && c.IdCategorize == invoiceModels.IdCategorize).ToList();
                decimal avePrice = 0;
                if (HangNhap.Count > 0)
                {
                    avePrice = (HangNhap.Select(c => c.TongTien).Sum() + invoiceModels.TongTien) / (HangNhap.Select(c => c.SoLuong).Sum() + invoiceModels.SoLuong);
                }

                wareHouse.Amount = invoiceModels.TongTien + wareHouse.Amount;
                wareHouse.AVEPrice = avePrice;
                //////
                wareHouse.IdCategorize = invoiceModels.IdCategorize;
                wareHouse.NameCategorize = invoiceModels.NameCategorize;
                wareHouse.Unit = wareHouse.Unit + invoiceModels.SoLuong;
                wareHouse.DateUpdate = DateTime.Now;
                wareHouse.Note = invoiceModels.Note;
                context.WareHouse.Update(wareHouse);
            }

            try
            {
                context.SaveChanges();
            }
            catch (Exception e)
            { }

            List<Categorize> categorizes = context.Categorize.ToList();
            ViewBag.categorizes = categorizes;
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Out()
        {
            List<Categorize> categorizes = context.Categorize.ToList();
            ViewBag.categorizes = categorizes;
            return View();
        }

        [HttpPost]
        public IActionResult Out(InvoiceModels invoiceModels)
        {
            context.Invoice.Add(new Invoice
            {
                TypeInvoice = 2,
                IdCategorize = invoiceModels.IdCategorize,
                NameCategorize = invoiceModels.NameCategorize,
                IdCustomer = invoiceModels.IdCustomer,
                SoLuong = invoiceModels.SoLuong,
                TongTien = invoiceModels.TongTien,
                PhatSinh = invoiceModels.PhatSinh,
                DateCreate = DateTime.Now,
                Note = invoiceModels.Note,
            });
            WareHouse wareHouse = context.WareHouse.Where(c => c.IdCategorize == invoiceModels.IdCategorize).FirstOrDefault();
            if (wareHouse == null)
            {
                wareHouse = new WareHouse
                {
                    IdCategorize = invoiceModels.IdCategorize,
                    NameCategorize = invoiceModels.NameCategorize,
                    Unit = invoiceModels.SoLuong,
                    Amount = invoiceModels.TongTien,
                    DateUpdate = DateTime.Now,
                    Note = invoiceModels.Note,
                };

                context.WareHouse.Add(wareHouse);
            }
            else
            {
                wareHouse.IdCategorize = invoiceModels.IdCategorize;
                wareHouse.NameCategorize = invoiceModels.NameCategorize;
                wareHouse.Unit = wareHouse.Unit - invoiceModels.SoLuong;
                wareHouse.Amount = wareHouse.Amount - invoiceModels.TongTien;
                wareHouse.DateUpdate = DateTime.Now;
                wareHouse.Note = invoiceModels.Note;
                context.WareHouse.Update(wareHouse);
            }

            try
            {
                context.SaveChanges();
            }
            catch (Exception e)
            {
                List<Categorize> categorizes = context.Categorize.ToList();
                ViewBag.categorizes = categorizes;
                return View();
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult RemoveInvoice(int id)
        {
            Invoice invoice = context.Invoice.Where(c => c.Id == id).FirstOrDefault();
            if (invoice != null)
            {
                try
                {
                    List<Invoice> HangXuat = context.Invoice.Where(c => c.TypeInvoice == 0 && c.IdCategorize == invoice.IdCategorize).ToList();
                    WareHouse wareHouse = context.WareHouse.Where(c => c.IdCategorize == invoice.IdCategorize ).FirstOrDefault();
                    decimal avePrice = 0;
                    if (HangXuat.Count > 0)
                    {
                        if (HangXuat.Select(c => c.SoLuong).Sum() - invoice.SoLuong == 0)
                            avePrice = 0;
                        else
                            avePrice = (HangXuat.Select(c => c.TongTien).Sum() - invoice.TongTien) / (HangXuat.Select(c => c.SoLuong).Sum() - invoice.SoLuong);
                    }

                    if (wareHouse != null)
                    {
                        wareHouse.IdCategorize = invoice.IdCategorize;
                        wareHouse.NameCategorize = invoice.NameCategorize;
                        wareHouse.Unit = invoice.TypeInvoice == 0 ? wareHouse.Unit - invoice.SoLuong : wareHouse.Unit + invoice.SoLuong;
                        wareHouse.Amount = wareHouse.Amount - invoice.TongTien;
                        wareHouse.DateUpdate = DateTime.Now;
                        wareHouse.Note = invoice.Note;
                        context.WareHouse.Update(wareHouse);
                        // 
                        wareHouse.AVEPrice = avePrice;
                    }
                    context.Invoice.Remove(invoice);
                    context.SaveChanges();
                }
                catch (Exception e)
                {
                    return Redirect("~/?removeInvoice=false");
                }
            }

            return Redirect("~/?removeInvoice=false");
        }

        [HttpPost]
        public IActionResult AddCategorize(string name)
        {
            Categorize categorize = context.Categorize.Where(c => c.Name == name).FirstOrDefault();
            if (categorize == null)
            {
                Categorize newCategorize = new Categorize { Name = name };
                try
                {
                    context.Categorize.Add(newCategorize);
                    context.SaveChanges();
                }
                catch (Exception e)
                { }
            }

            return RedirectToAction("In");
        }

        #endregion

        public IActionResult CreateTrip()
        {
            List<Categorize> categorizes = context.Categorize.ToList();
            ViewBag.categorizes = categorizes;
            ViewBag.TripName = "ngay " + DateTime.Now.ToString("dd/MM/yyyy");
            return View();
        }

        [HttpPost]
        public IActionResult CreateTrip(string NameTrip, decimal TotalMoney, string Note)
        {
            Trip trip = new Trip();
            trip.NameTrip = NameTrip;
            trip.TotalMoney = TotalMoney;
            trip.Note = Note;
            trip.DateCreate = DateTime.Now;
            try
            {
                int idTrip = context.Trip.AddAsync(trip).Id;
                List<ProductInTrip> productInTrips = context.ProductInTrip.Where(c => c.IdTrip == 0).ToList();
                foreach (var item in productInTrips)
                {
                    item.IdTrip = idTrip;
                    context.ProductInTrip.Update(item);
                }
                context.SaveChanges();
            }
            catch (Exception e)
            {
                List<Categorize> categorizes = context.Categorize.ToList();
                ViewBag.categorizes = categorizes;
                ViewBag.TripName = "ngay " + DateTime.Now.ToString("dd/MM/yyyy");
                return View();
            }
            return RedirectToAction("index");
        }


        [HttpPost]
        public IActionResult AddProduct(int IdCategorize, string NameCategorize, int Unit, decimal Total, decimal UnitPrice)
        {
            ProductInTrip item = new ProductInTrip();
            item.IdTrip = 0;
            item.IdCategorize = IdCategorize;
            item.NameCategorize = NameCategorize;
            item.Unit = Unit;
            item.TotalPrice = Total;
            item.UnitPrice = UnitPrice;

            context.ProductInTrip.Add(item);
            try
            {
                context.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(false);
            }

            return Json(true);
        }

        [HttpPost]
        public IActionResult GetAllProductFree()
        {
            return Json(context.ProductInTrip.Where(c => c.IdTrip == 0).ToList());
        }

        [HttpPost]
        public IActionResult RemoveProduct(int id)
        {
            try
            {
                ProductInTrip item = context.ProductInTrip.Find(id);
                context.ProductInTrip.Remove(item);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(false);
            }

            return Json(true);
        }
        

        public IActionResult Report()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
