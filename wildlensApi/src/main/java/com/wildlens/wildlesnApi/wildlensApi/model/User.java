package com.wildlens.wildlesnApi.wildlensApi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate; // Importer la classe LocalDate pour utiliser les dates

@Entity
@Table(name = "profil")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name_user;
    private String username_user;

    @Column(unique= true)
    private String mail_user;
    private String password;
    private LocalDate registration_date;

    // Getters and Setters
}
