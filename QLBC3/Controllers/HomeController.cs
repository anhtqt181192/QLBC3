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
            ViewBag.wareHouse = context.WareHouse.ToList();
            ViewBag.Invoice = context.Invoice.ToList();
            ViewBag.Capital1 = context.Capital.Where(c => c.Id == 1).FirstOrDefault().Amount;
            ViewBag.Capital2 = context.WareHouse.Select(c => c.Amount).Sum();
            return View();
        }

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
                    DateUpdate = DateTime.Now,
                    Note = invoiceModels.Note,
                };

                context.WareHouse.Add(wareHouse);
            }
            else
            {
                wareHouse.IdCategorize = invoiceModels.IdCategorize;
                wareHouse.NameCategorize = invoiceModels.NameCategorize;
                wareHouse.Unit = wareHouse.Unit + invoiceModels.SoLuong;
                wareHouse.Amount = invoiceModels.TongTien + wareHouse.Amount;
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
            return View();
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
