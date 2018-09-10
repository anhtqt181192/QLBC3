using QLBC3.App_Data.Database.Models;
using QLBC3.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLBC3.App_Data.Database
{
    public class Invoice
    {
        public int Id { get; set; }

        public int TypeInvoice { get; set; }

        public int IdCategorize { get; set; }

        public string NameCategorize { get; set; }

        public int IdCustomer { get; set; }

        public int SoLuong { get; set; }

        public decimal TongTien { get; set; }

        public decimal PhatSinh { get; set; }

        public DateTime DateCreate { get; set; }

        public string Note { get; set; }

    }
}
