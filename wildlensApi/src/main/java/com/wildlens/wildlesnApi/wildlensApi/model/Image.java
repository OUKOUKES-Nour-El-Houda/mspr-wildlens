package com.wildlens.wildlesnApi.wildlensApi.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String photoUrl;
    private LocalDateTime date;
    private String latitude;
    private String longitude;

    @ManyToOne
    private User user;
    @ManyToOne

    private Footprint footprint;  // L'empreinte associée à l'image

    @ManyToOne
    private InfoSpecies species;  // Espèce identifiée à partir de l'image

    // Getters and Setters
}
