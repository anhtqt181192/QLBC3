using QLBC3.App_Data.Database.Models;
using QLBC3.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLBC3.App_Data.Database
{
    public class Trip
    {
        public int Id { get; set; }

        public string NameTrip { get; set; }

        public decimal TotalMoney { get; set; }

        public DateTime DateCreate { get; set; }

        public string Note { get; set; }

    }
}
