using EkGis.Application.Catalog.NhanViens.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EkGis.Application.Catalog.NhanViens
{
    public interface INhanVienService
    {
        Task<NVCreateRequest> Create(NVCreateRequest request);
        Task<int> Update(NVUpdateRequest request);
        Task<int> Delete(int MaKH);
        Task<NVViewModel> GetByMa(int ma);
        Task<List<NVViewModel>> GetAll();
        Task<PagedResult<NVViewModel>> GetAllPaging(int page, int start, int limit, string keywords);
    }
}
