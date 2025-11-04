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
            var rolesDto = _mapper.Map<IEnumerable<RolesDto>>(roles.Items);

            foreach (var role in rolesDto)
            {
                if (role.Permissions != null)
                {
                    role.Permissions = role.Permissions          
                        .OrderBy(p => p.EntityName)       
                        .ToList();
                }
            }

            return new PagedResult<RolesDto>
            {
                Items = rolesDto,
                TotalCount = roles.TotalCount,
                PageNumber = roles.PageNumber,
                PageSize = roles.PageSize
            };
        }

        public async Task<CreateRoleDto> GetRoleByIdAsync(int id)
        {
            var roles = await _roleRepository.GetByIdAsync(id);
            if (roles == null) return null;
            return _mapper.Map<CreateRoleDto>(roles);
        }


        public async Task<CreateRoleDto> CreateRoleAsync(CreateRoleDto dto)
        {
            var existingRole = await _roleRepository.GetByNameAsync(dto.RoleName);

            if (existingRole != null)
            {
                return null;
            }

            var roleEntity = _mapper.Map<Roles>(dto);
            var created = await _roleRepository.CreateAsync(roleEntity);
            return _mapper.Map<CreateRoleDto>(created);
        }

        public async Task<CreateRoleDto> UpdateRoleAsync(int id, CreateRoleDto dto)
        {
            var existingRole = await _roleRepository.GetByIdAsync(id);
            if (existingRole == null)
            {
                return null;
            }
            //existingRole.RoleName = dto.RoleName;
            _mapper.Map(dto, existingRole);
            var updated = await _roleRepository.UpdateAsync(id, existingRole);
            return _mapper.Map<CreateRoleDto>(updated);
        }

        public async Task<CreateRoleDto> DeleteRoleAsync(int id)
        {
            var deleted = await _roleRepository.DeleteAsync(id);
            return deleted == null ? null : _mapper.Map<CreateRoleDto>(deleted);
        }

        public async Task<List<CreateRoleDto>> GetRoleListAsync()
        {
            var roles = await _roleRepository.GetAllRoleAsync();
            return _mapper.Map<List<CreateRoleDto>>(roles);
        }
    }
}
