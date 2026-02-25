package com.clinical.saas.repository;

import com.clinical.saas.entity.AppUser;
import com.clinical.saas.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    List<AppUser> findByRole(Role role);
    long countByRole(Role role);
}
