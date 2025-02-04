package com.wildlens.wildlesnApi.wildlensApi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Footprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double x1;
    private Double x2;
    private Double y1;
    private Double y2;

    @ManyToOne
    private User user;  // L'utilisateur qui a pris la photo

    // Getters and Setters
}

