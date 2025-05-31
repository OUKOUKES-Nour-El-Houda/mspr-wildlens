package com.wildlens.wildlesnApi.wildlensApi.controller.in;


import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginUserDtoIn {
        private String name_user;
        private String username_user;
        private String mail_user;
        private String password;
        private LocalDate registration_date;

}
