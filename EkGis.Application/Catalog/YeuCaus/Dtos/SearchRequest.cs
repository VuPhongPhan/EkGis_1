using System;
using System.Collections.Generic;
using System.Text;

namespace EkGis.Application.Catalog.YeuCaus.Dtos
{
    public class SearchRequest
    {
        public int page { set; get; }
        public int start { set; get; }
        public int limit { set; get; }
        public int? MaLoai { set; get; }
        public string TenKH { set; get; }
        public int? MaTrangThai { set; get; }
        public DateTime? NgayBatDau { set; get; }
        public DateTime? NgayKetThuc { set; get; }
        public string Noidung { set; get; }
    }
}
