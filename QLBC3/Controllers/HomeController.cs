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
            ViewBag.ExportProduct = context.ExportProduct.ToList();
            ViewBag.Capital = context.Capital.Where(c => c.Id == 1).FirstOrDefault().Amount;
            ViewBag.TotalIn = context.Trip.Sum(c => c.TotalMoney);
            ViewBag.TotalOut = context.ExportProduct.Sum(c => c.TotalPrice);
            decimal interest = 0;
            List<ExportProduct> exportProducts = context.ExportProduct.ToList();
            foreach (var item in exportProducts)
            {
                decimal unitPrice = context.ProductInTrip.Find(item.IdProductInTrip).UnitPrice;
                interest += (item.UnitPrice - unitPrice) * item.Unit;
            }
            ViewBag.interest = interest;
            return View();
        }

        [HttpGet]
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
                context.Trip.Add(trip);
                context.SaveChanges();
                List<ProductInTrip> productInTrips = context.ProductInTrip.Where(c => c.IdTrip == 0).ToList();
                foreach (var item in productInTrips)
                {
                    item.IdTrip = trip.Id;
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

        [HttpGet]
        public IActionResult ExportProduct(int? id)
        {
            ViewBag.selectValue = id.HasValue;
            ViewBag.Trip = context.Trip.ToList();
            ViewBag.Id = id;
            if (id.HasValue)
            {
                Trip trip = context.Trip.Find(id);
                List<ProductInTrip> productInTrips = context.ProductInTrip.Where(c => c.IdTrip == id).ToList();
                foreach (var item in productInTrips)
                {
                    int ex = context.ExportProduct.Where(c => c.IdProductInTrip == item.Id).Sum(c => c.Unit);
                    item.Unit = item.Unit - ex;
                }
                ViewBag.categorizes = productInTrips.Select(c => new Categorize{ Id = c.Id,
                                                                                 Name = c.NameCategorize,
                                                                                 Note = c.UnitPrice.ToString("N0") + " " + c.Note }).ToList();
                ViewBag.tripId = trip.Id;
            }

            return View();
        }

        [HttpPost]
        public IActionResult ExportProduct(ExportProduct model)
        {
            try
            {
                context.ExportProduct.Add(new ExportProduct {
                    IdTrip = model.IdTrip,
                    NameCategorize = model.NameCategorize,
                    IdProductInTrip = model.IdProductInTrip,
                    DateCreate = DateTime.Now,
                    Unit = model.Unit,
                    TotalPrice = model.TotalPrice,
                    UnitPrice = model.TotalPrice / model.Unit,
                    Note = model.Note,
                });
                context.SaveChanges();
            }
            catch (Exception e)
            {
                return View();
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult AddCategorize(string name)
        {
            try
            {
                context.Categorize.Add(new Categorize
                {
                    Name = name,
                });
                context.SaveChanges();
            }
            catch (Exception e)
            {
                return View();
            }
            return RedirectToAction("CreateTrip");
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
