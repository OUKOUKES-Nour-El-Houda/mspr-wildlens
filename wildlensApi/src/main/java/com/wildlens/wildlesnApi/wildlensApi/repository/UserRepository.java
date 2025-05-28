package com.wildlens.wildlesnApi.wildlensApi.repository;

import com.wildlens.wildlesnApi.wildlensApi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByMail_user(String mail_user);
}
