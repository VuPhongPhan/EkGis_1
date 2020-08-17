using System;
using System.Collections.Generic;
using System.Text;

namespace EkGis.Application.Catalog.NhanViens.Dtos
{
    public class NVViewModel
    {
        public int MaNV { set; get; }
        public string TenNV { set; get; }
        public string ChucVu { set; get; }
        public string Email { set; get; }
        public string SDT { set; get; }
        public string DiaChi { set; get; }
        public DateTime? NgaySinh { set; get; }
    }
}
