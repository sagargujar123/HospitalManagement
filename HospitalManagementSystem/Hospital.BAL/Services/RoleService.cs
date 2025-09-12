using AutoMapper;
using Hospital.BAL.Interfaces;
using Hospital.Common.Helpers;
using Hospital.DAL.Interfaces;
using Hospital.Models;
using HospitalManagementSystem.DAL.Entities;

namespace Hospital.BAL.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;
        public RoleService(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<RolesDto>> GetAllRolesAsync(int pageNumber = 1, int pageSize = 10)
        {
            var roles = await _roleRepository.GetAllAsync(pageNumber, pageSize);
            
            return new PagedResult<RolesDto>
            {
                Items = _mapper.Map<IEnumerable<RolesDto>>(roles.Items),
                TotalCount = roles.TotalCount,
                PageNumber = roles.PageNumber,
                PageSize = roles.PageSize
            };
        }

        public async Task<RolesDto> GetRoleByIdAsync(int id)
        {
            var roles = await _roleRepository.GetByIdAsync(id);
            if (roles == null) return null;
            return _mapper.Map<RolesDto>(roles);
        }

        public async Task<RolesDto> CreateRoleAsync(RolesDto dto)
        {
            var roleEntity = _mapper.Map<Roles>(dto);
            var created = await _roleRepository.CreateAsync(roleEntity);
            return _mapper.Map<RolesDto>(created);
        }

        public async Task<RolesDto> UpdateRoleAsync(int id, RolesDto dto)
        {
            var roleEntity = _mapper.Map<Roles>(dto);
            var updated = await _roleRepository.UpdateAsync(id, roleEntity);
            return _mapper.Map<RolesDto>(updated);
        }

        public async Task<RolesDto> DeleteRoleAsync(int id)
        {
            var deleted = await _roleRepository.DeleteAsync(id);
            return deleted == null ? null : _mapper.Map<RolesDto>(deleted);
        }
    }
}
