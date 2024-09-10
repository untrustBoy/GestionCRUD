using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Data
{
    public partial class Customer
    {
        [Column("CustomerId")]
        public int customerId { get; set; }
        [Column("Name")]
        public string name { get; set; }
    }
}
