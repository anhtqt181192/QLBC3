using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QLBC3.App_Data.Database;
using QLBC3.Data;

namespace QLBC3.Controllers
{
    [Authorize]
    public class DataServicesController : Controller
    {
        private ApplicationDbContext context;

        public DataServicesController(ApplicationDbContext _context)
        {
            context = _context;
        }

        [HttpPost]
        public IActionResult GetAllProductFree()
        {
            return Json(context.ProductInTrip.Where(c => c.IdTrip == 0).ToList());
        }

        [HttpPost]
        public IActionResult GetProductByIdTrip(int id)
        {
            List<ProductInTrip> productInTrips = context.ProductInTrip.Where(c => c.IdTrip == id).ToList();
            foreach (var item in productInTrips)
            {
                int ex = context.ExportProduct.Where(c => c.IdProductInTrip == item.Id).Sum(c => c.Unit);
                item.Unit = item.Unit - ex;
            }
            return Json(productInTrips);
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
        public IActionResult RemoveProduct(int id)
        {
            try
            {
                ProductInTrip item = context.ProductInTrip.Find(id);
                if (item.IdTrip != 0)
                {
                    Trip trip = context.Trip.Find(item.IdTrip);
                    if (trip != null)
                    {
                        trip.TotalMoney = trip.TotalMoney - item.TotalPrice;
                        context.Trip.Update(trip);
                    }
                }
                context.ProductInTrip.Remove(item);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(false);
            }

            return Json(true);
        }


        [HttpPost]
        public IActionResult RemoveTrip(int id)
        {
            try
            {
                Trip item = context.Trip.Find(id);
                context.Trip.Remove(item);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(false);
            }

            return Json(true);
        }


        [HttpPost]
        public IActionResult RemoveExport(int id)
        {
            try
            {
                ExportProduct export = context.ExportProduct.Find(id);
                context.ExportProduct.Remove(export);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(false);
            }

            return Json(true);
        }
        
    }
}