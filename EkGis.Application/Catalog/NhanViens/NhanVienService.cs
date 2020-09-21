using EkGis.Application.Catalog.NhanViens.Dtos;
using EkGis.Data.EF;
using EkGis.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EkGis.Application.Catalog.NhanViens
{
    public class NhanVienService : INhanVienService
    {
        private EkGisDbContext _context;
        public NhanVienService(EkGisDbContext context)
        {
            _context = context;
        }
        public async Task<NVCreateRequest> Create(NVCreateRequest request)
        {
            var nhanVien = new NhanVien()
            {
                MaNV = request.MaNV,
                TenNV = request.TenNV,
                DiaChi = request.DiaChi,
                ChucVu = request.ChucVu,
                Email = request.Email,
                NgaySinh = request.NgaySinh,
                SDT = request.SDT
            };
            _context.NhanViens.Add(nhanVien);
            await _context.SaveChangesAsync();
            return request;
        }
        public async Task<int> Update(NVUpdateRequest request)
        {
            var maNV = await _context.NhanViens.FindAsync(request.MaNV);
            var nhanVien = await _context.NhanViens.FirstOrDefaultAsync(x => x.MaNV == request.MaNV);
            if (nhanVien == null) throw new EkGisException($"Khong tim thay nhan vien: {request.MaNV}");

            nhanVien.TenNV = request.TenNV;
            nhanVien.DiaChi = request.DiaChi;
            nhanVien.Email = request.Email;
            nhanVien.ChucVu = request.ChucVu;
            nhanVien.NgaySinh = request.NgaySinh;
            nhanVien.SDT = request.SDT;

            return await _context.SaveChangesAsync();

        }
        public async Task<int> Delete(int MaKH)
        {
            var nhanVien = await _context.NhanViens.FindAsync(MaKH);
            if (nhanVien == null) throw new EkGisException($"Khong tim thay nhan vien: {MaKH}");

            _context.NhanViens.Remove(nhanVien);
            return await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<NVViewModel>> GetAllPaging(int page, int start, int limit, string keywords)
        {
            var query = from a in _context.NhanViens select new { a };

            if (!string.IsNullOrEmpty(keywords))
                query = query.Where(x => x.a.TenNV.Contains(keywords));

            int totalRow = await query.CountAsync();

            var data = await query.Skip((page - 1) * limit)
                     .Take(limit)
                     .Select(x => new NVViewModel()
                     {
                         MaNV = x.a.MaNV,
                         TenNV = x.a.TenNV,
                         ChucVu = x.a.ChucVu,
                         DiaChi = x.a.DiaChi,
                         Email = x.a.Email,
                         NgaySinh = x.a.NgaySinh,
                         SDT = x.a.SDT
                     }).ToListAsync();

            var pagedResult = new PagedResult<NVViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<NVViewModel> GetByMa(int ma)
        {
            var nhanVien = await _context.NhanViens.FindAsync(ma);
            var NVViewModel = new NVViewModel()
            {
                MaNV = nhanVien.MaNV,
                TenNV = nhanVien.TenNV,
                ChucVu = nhanVien.ChucVu,
                DiaChi = nhanVien.DiaChi,
                Email = nhanVien.Email,
                NgaySinh = nhanVien.NgaySinh,
                SDT = nhanVien.SDT
            };
            return NVViewModel;
        }
        public async Task<List<NVViewModel>> GetAll()
        {
            var query = from a in _context.NhanViens select new { a };

            var data = await query.Select(x => new NVViewModel()
            {
                MaNV = x.a.MaNV,
                TenNV = x.a.TenNV,
                ChucVu = x.a.ChucVu,
                DiaChi = x.a.DiaChi,
                Email = x.a.Email,
                NgaySinh = x.a.NgaySinh,
                SDT = x.a.SDT
            }).ToListAsync();
            return new List<NVViewModel>(data);
        }

    }
}
