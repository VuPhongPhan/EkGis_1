using EkGis.Application.Catalog.KhachHangs.Dtos;
using EkGis.Data.EF;
using EkGis.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EkGis.Application.Catalog.KhachHangs
{
    public class KhachHangService : IKhachHangService
    {
        private EkGisDbContext _context;
        public KhachHangService(EkGisDbContext context)
        {
            _context = context;
        }
        public async Task<KHCreateRequest> Create(KHCreateRequest request)
        {
            var khachHang = new KhachHang()
            {
                MaKH = request.MaKH,
                TenKH = request.TenKH,
                DiaChi = request.DiaChi,
                Email = request.Email,
                NgaySinh = request.NgaySinh,
                SDT = request.SDT
            };
            _context.KhachHangs.Add(khachHang);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<int> Update(KHEditRequest request)
        {
            var maKH = await _context.KhachHangs.FindAsync(request.MaKH);
            var khachHang = await _context.KhachHangs.FirstOrDefaultAsync(x => x.MaKH == request.MaKH);
            if (khachHang == null) throw new EkGisException($"Khong tim thay khach hang: {request.MaKH}");

            khachHang.TenKH = request.TenKH;
            khachHang.DiaChi = request.DiaChi;
            khachHang.Email = request.Email;
            khachHang.NgaySinh = request.NgaySinh;
            khachHang.SDT = request.SDT;

            return await _context.SaveChangesAsync();
        }
        public async Task<int> Delete(int MaKH)
        {
            var khachHang = await _context.KhachHangs.FindAsync(MaKH);
            if (khachHang == null) throw new EkGisException($"khong tim thay ma loai : {MaKH}");
            _context.KhachHangs.Remove(khachHang);
            return await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<KHViewModel>> GetAllPaging(int page, int start, int limit, string keywords)
        {
            var query = from a in _context.KhachHangs select new { a };

            if (!string.IsNullOrEmpty(keywords))
                query = query.Where(x => x.a.TenKH.Contains(keywords));

            int totalRow = await query.CountAsync();

            var data = await query.Skip((page - 1) * limit)
                     .Take(limit)
                     .Select(x => new KHViewModel()
                     {
                         MaKH = x.a.MaKH,
                         TenKH = x.a.TenKH,
                         DiaChi = x.a.DiaChi,
                         Email = x.a.Email,
                         NgaySinh = x.a.NgaySinh,
                         SDT = x.a.SDT
                     }).ToListAsync();

            var pagedResult = new PagedResult<KHViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<KHViewModel> GetByMa(int ma)
        {
            var khachHang = await _context.KhachHangs.FindAsync(ma);
            var KHViewModel = new KHViewModel()
            {
                MaKH = khachHang.MaKH,
                TenKH = khachHang.TenKH,
                DiaChi = khachHang.DiaChi,
                Email = khachHang.Email,
                SDT = khachHang.SDT,
                NgaySinh = khachHang.NgaySinh
            };
            return KHViewModel;
        }

        public async Task<List<KHViewModel>> GetAll()
        {
            var query = from a in _context.KhachHangs select new { a };
            var data = await query.Select(x => new KHViewModel()
                     {
                         MaKH = x.a.MaKH,
                         TenKH = x.a.TenKH,
                         DiaChi = x.a.DiaChi,
                         Email = x.a.Email,
                         NgaySinh = x.a.NgaySinh,
                         SDT = x.a.SDT
                     }).ToListAsync();
            return data;
        }
    }
}
