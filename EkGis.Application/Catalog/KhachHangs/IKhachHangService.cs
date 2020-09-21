using EkGis.Application.Catalog.KhachHangs.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EkGis.Application.Catalog.KhachHangs
{
    public interface IKhachHangService
    {
        Task<KHCreateRequest> Create(KHCreateRequest request);
        Task<int> Update(KHEditRequest request);
        Task<int> Delete(int MaKH);
        Task<List<KHViewModel>> GetAll();
        Task<PagedResult<KHViewModel>> GetAllPaging(int page, int start, int limit, string keywords);
    }
}
