package com.wildlens.wildlesnApi.wildlensApi.controller.out;

import com.wildlens.wildlesnApi.wildlensApi.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDtoOut {
    private Long id;
    private String name_user;
    private String username_user;
    private String mail_user;
    private LocalDate registration_date;

    public UserDtoOut(User user) {
        this.id = user.getId();
        this.name_user = user.getName_user();
        this.username_user = user.getUsername_user();
        this.mail_user = user.getMail_user();
        this.registration_date= user.getRegistration_date();
    }

}
