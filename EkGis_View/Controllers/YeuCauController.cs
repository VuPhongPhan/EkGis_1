using System.Threading.Tasks;
using EkGis.Application.Catalog.YeuCaus;
using EkGis.Application.Catalog.YeuCaus.Dtos;
using EkGis.Data.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EkGis_1.Controllers
{
    [EnableCors("Origin")]
    [Route("api/[controller]")]
    [ApiController]
    public class YeuCauController : ControllerBase
    {
        private readonly IYeuCauService _yeuCauService;
        public YeuCauController(IYeuCauService yeuCauService)
        {
            _yeuCauService = yeuCauService;
        }

        [HttpGet("EkGis")]
        public async Task<IActionResult> GetAll()
        {
            var yeuCaus = await _yeuCauService.GetAll();
            return Ok(yeuCaus);
        }
        [HttpGet()]
        public async Task<IActionResult> GetSearch([FromQuery] SearchRequest request)
        {
            var yeuCaus = await _yeuCauService.GetAllPaging(request);
            return Ok(yeuCaus);
        }
       /* [HttpGet("{ma}")]
        public async Task<IActionResult> GetByMa(int ma)
        {
            var yeuCau = await _yeuCauService.GetByMa(ma);
            if (yeuCau == null)
                return BadRequest("khong tim thay yeu cau");
            return Ok(yeuCau);
        }*/
        [HttpPut()]
        public async Task<IActionResult> Update([FromBody] YeuCauEditRequest request)
        {
            var result = await _yeuCauService.Update(request);
            return Ok(result);
        }
        [HttpPost()]
        public async Task<IActionResult> Create([FromBody] YeuCauCreateRequest request)
        {
            var maYeuCau = await _yeuCauService.Create(request);
            return Ok(maYeuCau);
        }
        [HttpDelete("{ma}")]
        public async Task<IActionResult> DeleTe(int ma)
        {
            var result = await _yeuCauService.Delete(ma);
            return Ok(result);
        }
        [HttpPut("{maYeuCau}/{maStatus}/{moTa}")]
        public async Task<IActionResult> UpdateStatus(int maYeuCau, int maStatus, string moTa)
        {
            var result = await _yeuCauService.UpdateStatus(maYeuCau, maStatus, moTa);
            return Ok(result);
        }
    }
}
