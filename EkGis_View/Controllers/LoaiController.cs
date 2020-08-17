using System.Threading.Tasks;
using EkGis.Application.Catalog.Loais;
using EkGis.Application.Catalog.Loais.Dtos;
using EkGis.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EkGis_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class LoaiController : ControllerBase
    {
        private readonly ILoaiservice _loaiService;

        public LoaiController(ILoaiservice loaiService)
        {
            _loaiService = loaiService;
        }
        [HttpGet("paging/{keywords}")]
        public async Task<IActionResult> GetSearch(int page, int start, int limit, string keywords)
        {
            var loais = await _loaiService.GetAllPaging(page, start, limit, keywords);
            return Ok(loais);
        }
        [HttpGet("paging")]
        public async Task<IActionResult> GetAllPaging(int page, int start, int limit, string keywords)
        {
            var loais = await _loaiService.GetAllPaging(page, start, limit, keywords);
            return Ok(loais);
        }
        [HttpGet()]
        public async Task<IActionResult> GetAll()
        {
            var loais = await _loaiService.GetAll();
            return Ok(loais);
        }
        /*[HttpGet("{ma}")]
        public async Task<IActionResult> GetByMa(int ma)
        {
            var loai = await _loaiService.GetByMa(ma);
            if (loai == null)
                return BadRequest("khong tim thay loai");
            return Ok(loai);
        }*/
        [HttpPost()]
        public async Task<IActionResult> Create([FromBody] Loai request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var maloai = await _loaiService.Create(request);
            if (maloai == null)
                return BadRequest();
            // var loai = await _loaiService.GetByMa(maloai);
            return Ok(maloai);
            // return CreatedAtAction(nameof(GetByMa), new { maloai = request.MaLoai }, request);
        }
        [HttpDelete("{ma}")]
        public async Task<IActionResult> Delete(int ma)
        {
            var result = await _loaiService.Delete(ma);
            if (result == null)
                return BadRequest();
            return Ok();
        }
        [HttpPut("{maLoai}")]
        public async Task<IActionResult> Update(int maLoai, Loai request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _loaiService.Update(maLoai, request.TenLoai);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok();
        }
    }

}
