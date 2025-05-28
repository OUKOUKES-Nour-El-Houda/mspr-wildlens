-- V1__Create_Footprint_Table.sql
CREATE TABLE footprint (
                           id BIGSERIAL PRIMARY KEY,                 -- Identifiant unique auto-incrémenté
                           x1 DOUBLE PRECISION NOT NULL,            -- Coordonnée x1
                           x2 DOUBLE PRECISION NOT NULL,            -- Coordonnée x2
                           y1 DOUBLE PRECISION NOT NULL,            -- Coordonnée y1
                           y2 DOUBLE PRECISION NOT NULL,            -- Coordonnée y2
                           profil_id BIGINT,                        -- Relation avec l'utilisateur
                           CONSTRAINT fk_profil FOREIGN KEY (profil_id) REFERENCES profil(id) -- Clé étrangère vers la table `profil`
);
