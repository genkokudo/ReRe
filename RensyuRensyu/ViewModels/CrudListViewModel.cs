using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RensyuRensyu.ViewModels
{
    public class CrudListViewModel
    {
        public long CrudId { get; set; }
        public string Name { get; set; }
        public string CompanyName { get; set; }
        public List<string> UserAuthorities { get; set; }
        public bool IsDeleted { get; set; }
    }
}
