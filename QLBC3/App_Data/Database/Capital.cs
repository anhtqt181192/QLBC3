using QLBC3.App_Data.Database.Models;
using QLBC3.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLBC3.App_Data.Database
{
    public class Capital
    {
        public int Id { get; set; }

        public int TypeCapital { get; set; }

        public string NameCapital { get; set; }

        public decimal Amount { get; set; }

        public string Note { get; set; }

    }
}
