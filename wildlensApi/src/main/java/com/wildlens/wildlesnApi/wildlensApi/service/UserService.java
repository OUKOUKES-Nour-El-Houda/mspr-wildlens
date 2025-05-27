package com.wildlens.wildlesnApi.wildlensApi.service;

import com.wildlens.wildlesnApi.wildlensApi.controller.in.UserDtoIn;
import com.wildlens.wildlesnApi.wildlensApi.controller.out.UserDtoOut;
import com.wildlens.wildlesnApi.wildlensApi.model.User;
import com.wildlens.wildlesnApi.wildlensApi.repository.UserRepository;
import com.wildlens.wildlesnApi.wildlensApi.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Slf4j
@Service
@Builder
@Validated
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // Ajout du hachage



    public List<UserDtoOut> getAllUser() {
        return userRepository.findAll()
                .stream()
                .map(UserDtoOut::new).toList();
    }

    public UserDtoOut createUser(@Valid UserDtoIn userDtoIn) {
        User user = User.builder()
                .name_user(userDtoIn.getName_user())
                .username_user(userDtoIn.getUsername_user())
                .mail_user(userDtoIn.getMail_user())
                .password(passwordEncoder.encode(userDtoIn.getPassword())) // HASH du mot de passe
                .registration_date(userDtoIn.getRegistration_date())
                .build();
        user = userRepository.save(user);
        return new UserDtoOut(user);
    }

    public String authenticate(String mail_user, String password) {
        User user = userRepository.findByMail_user(mail_user);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return jwtUtil.generateToken(user.getMail_user());
        } else {
            return null; // Ou lancer une exception
        }
    }



}
