using AutoMapper;
using Hospital.BAL.Interfaces;
using Hospital.Common.Helpers;
using Hospital.DAL.Interfaces;
using Hospital.Models;
using HospitalManagementSystem.DAL.Entities;

namespace Hospital.BAL.Services
{
    public class PermissionService : IPermissionService
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly IMapper _mapper;
        public PermissionService(IPermissionRepository permissionRepository, IMapper mapper)
        {
            _permissionRepository = permissionRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<PermissionsDto>> GetAllPermissionsAsync(int pageNumber = 1, int pageSize = 10)
        {
            var roles = await _permissionRepository.GetAllAsync(pageNumber, pageSize);

            return new PagedResult<PermissionsDto>
            {
                Items = _mapper.Map<IEnumerable<PermissionsDto>>(roles.Items),
                TotalCount = roles.TotalCount,
                PageNumber = roles.PageNumber,
                PageSize = roles.PageSize
            };
        }

        public async Task<CreatePermissionDto> GetPermissionByIdAsync(int id)
        {
            var roles = await _permissionRepository.GetByIdAsync(id);
            if (roles == null) return null;
            return _mapper.Map<CreatePermissionDto>(roles);
        }


        public async Task<CreatePermissionDto> CreatePermissionAsync(CreatePermissionDto dto)
        {
            var existingPermission = await _permissionRepository.GetByEntityAndColumnAsync(dto.EntityName, dto.ColumnName);

            if (existingPermission != null)
            {
                return null;
            }

            var roleEntity = _mapper.Map<Permissions>(dto);
            var created = await _permissionRepository.CreateAsync(roleEntity);
            return _mapper.Map<CreatePermissionDto>(created);
        }

        public async Task<CreatePermissionDto> UpdatePermissionAsync(int id, CreatePermissionDto dto)
        {
            var existingPermission = await _permissionRepository.GetByIdAsync(id);
            if (existingPermission == null)
            {
                return null;
            }
             _mapper.Map(dto, existingPermission);
            var updated = await _permissionRepository.UpdateAsync(id, existingPermission);
            return _mapper.Map<CreatePermissionDto>(updated);
        }

        public async Task<CreatePermissionDto> DeletePermissionAsync(int id)
        {
            var deleted = await _permissionRepository.DeleteAsync(id);
            return _mapper.Map<CreatePermissionDto>(deleted);
        }
    }
}
