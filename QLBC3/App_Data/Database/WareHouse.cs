using QLBC3.App_Data.Database.Models;
using QLBC3.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLBC3.App_Data.Database
{
    public class WareHouse
    {
        public int Id { get; set; }

        public int IdCategorize { get; set; }

        public string NameCategorize { get; set; }

        public int Unit { get; set; }

        public DateTime DateUpdate { get; set; }

        public string Note { get; set; }

    }
}
