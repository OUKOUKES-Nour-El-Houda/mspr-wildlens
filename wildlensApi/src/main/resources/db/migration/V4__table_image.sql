-- V1__create_table_image.sql
CREATE TABLE image (
                       id BIGSERIAL PRIMARY KEY,  -- Utilisation de BIGSERIAL pour l'auto-incrémentation
                       photo_url VARCHAR(255) NOT NULL,  -- Le chemin de l'image
                       date TIMESTAMP NOT NULL,  -- Date et heure de la prise de la photo
                       latitude VARCHAR(50),  -- Latitude pour la géolocalisation
                       longitude VARCHAR(50),  -- Longitude pour la géolocalisation

    -- Relations avec les autres tables
                       profil_id BIGINT,  -- Clé étrangère vers la table User
                       footprint_id BIGINT,  -- Clé étrangère vers la table Footprint
                       species_id BIGINT,  -- Clé étrangère vers la table InfoSpecies

                       CONSTRAINT fk_profil FOREIGN KEY (profil_id) REFERENCES "profil" (id) ON DELETE SET NULL,  -- Association à la table User
                       CONSTRAINT fk_footprint FOREIGN KEY (footprint_id) REFERENCES footprint (id) ON DELETE CASCADE,  -- Association à la table Footprint
                       CONSTRAINT fk_species FOREIGN KEY (species_id) REFERENCES info_species (id) ON DELETE SET NULL  -- Association à la table InfoSpecies
);
