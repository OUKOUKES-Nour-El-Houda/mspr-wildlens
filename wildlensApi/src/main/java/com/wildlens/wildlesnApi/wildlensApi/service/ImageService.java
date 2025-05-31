//package com.wildlens.wildlesnApi.wildlensApi.service;
//
//import lombok.Builder;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.validation.annotation.Validated;
//
//@Slf4j
//@Service
//@Builder
//@Validated
//@RequiredArgsConstructor
//public class ImageService {
//
//}
package com.wildlens.wildlesnApi.wildlensApi.service;
import com.wildlens.wildlesnApi.wildlensApi.controller.in.ImageDtoIn;
import com.wildlens.wildlesnApi.wildlensApi.controller.out.ImageDtoOut;
import com.wildlens.wildlesnApi.wildlensApi.model.*;
import com.wildlens.wildlesnApi.wildlensApi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
@RequiredArgsConstructor
public class ImageService {

    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final InfoSpeciesRepository infoSpeciesRepository;
    private final IdentificationRepository identificationRepository;
    private final WebClient webClient;
    private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

    private final Path uploadDir = Paths.get("src/main/resources/uploads");

    public ImageDtoOut processImage(MultipartFile multipartFile, ImageDtoIn dtoIn) {
//        try {
//            // Étape 1 : sauvegarder l'image localement
//            String filename = UUID.randomUUID() + ".png";
//            File savedFile = new File(SAVE_PATH + filename);
//            file.transferTo(savedFile);
//
//            // Étape 2 : appel à l'API Flask
//            EspecePredictionResponse response = callFlask(savedFile);
//
//            if (!response.isSuccess()) {
//                Files.deleteIfExists(savedFile.toPath());
//                throw new RuntimeException("La prédiction a échoué.");
//            }
//
//            // Étape 3 : récupération ou création de l'espèce
//            InfoSpecies species = speciesRepository
//                    .findByEspecesIgnoreCase(response.getSpeciesInfo().getEspece())
//                    .orElseGet(() -> {
//                        InfoSpecies s = InfoSpecies.builder()
//                                .especes(response.getSpeciesInfo().getEspece())
//                                .description(response.getSpeciesInfo().getDescription())
//                                .nomLatin(response.getSpeciesInfo().getNomLatin())
//                                .famille(response.getSpeciesInfo().getFamille())
//                                .taille(response.getSpeciesInfo().getTaille())
//                                .region(response.getSpeciesInfo().getRegion())
//                                .habitat(response.getSpeciesInfo().getHabitat())
//                                .funfact(response.getSpeciesInfo().getFunFact())
//                                .build();
//                        return speciesRepository.save(s);
//                    });
//
//
//            // Étape 4 : sauvegarde de l'image
//            User user = userRepository.findById(dtoIn.getProfilId())
//                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
//
//            Image image = Image.builder()
//                    .photoUrl("/uploads/" + filename)
//                    .latitude(dtoIn.getLatitude())
//                    .longitude(dtoIn.getLongitude())
//                    .date(dtoIn.getDate())
//                    .user(user)
//                    .build();
//
//            image = imageRepository.save(image);
//
//            // Étape 5 : enregistrement de l'identification
//            Identification id = Identification.builder()
//                    .image(image)
//                    .species(species)
//                    .confidence((float) response.getConfidence())
//                    .identificationDate(LocalDateTime.now())
//                    .build();
//
//            identificationRepository.save(id);
//
//            // Étape 6 : retour DTO enrichi
//            return ImageDtoOut.builder()
//                    .imageId(image.getImageId())
//                    .photoUrl(image.getPhotoUrl())
//                    .confidence((float) response.getConfidence())
//                    .description(species.getDescription())
//                    .espece(species.getEspeces())
//                    .famille(species.getFamille())
//                    .funFact(species.getFunfact())
//                    .habitat(species.getHabitat())
//                    .nomLatin(species.getNomLatin())
//                    .region(species.getRegion())
//                    .taille(species.getTaille())
//                    .build();
//
//        } catch (IOException e) {
//            throw new RuntimeException("Erreur lors du traitement de l'image", e);
//        }
//    }
//
//    private EspecePredictionResponse callFlask(File file) {
//        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//        body.add("image", new FileSystemResource(file));
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//
//        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
//
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<EspecePredictionResponse> response = restTemplate.postForEntity(
//                "http://localhost:5000/api/predict", request, EspecePredictionResponse.class
//        );
//
//        return response.getBody();
//    }

//
        try {
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            String originalFilename = multipartFile.getOriginalFilename();
            if (originalFilename == null || originalFilename.isBlank()) {
                throw new RuntimeException("Nom de fichier invalide");
            }

            String fileName = UUID.randomUUID() + "-" + originalFilename;
            Path filePath = uploadDir.resolve(fileName);
            Files.write(filePath, multipartFile.getBytes());

            User user = userRepository.findById(dtoIn.getProfilId())
                    .orElseThrow(() -> new RuntimeException("Profil non trouvé"));

            Image image = Image.builder()
                    .photoUrl("/uploads/" + fileName)
                    .latitude(dtoIn.getLatitude())
                    .longitude(dtoIn.getLongitude())
                    .date(dtoIn.getDate())
                    .user(user)
                    .build();
            image = imageRepository.save(image);

            ImageDtoOut response = webClient.post()
                    .uri("/predict")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromMultipartData("image", multipartFile.getResource()))
                    .retrieve()
                    .bodyToMono(ImageDtoOut.class)
                    .block();


            if (response == null) {
                throw new RuntimeException("Réponse vide de l'API Flask");
            }

            logger.info("Espèce reçue de Flask : {}", response.getEspece());

//            InfoSpecies species = infoSpeciesRepository.findByEspecesIgnoreCase(response.getEspece())
//                    .orElseThrow(() -> new RuntimeException("Espèce non trouvée"));

            Optional<InfoSpecies> optionalSpecies = infoSpeciesRepository.findByEspecesIgnoreCase(response.getEspece());
            if (optionalSpecies.isEmpty()) {
                logger.error("Espèce non trouvée en base : {}", response.getEspece());
                throw new RuntimeException("Espèce non trouvée : " + response.getEspece());
            }

            InfoSpecies species = optionalSpecies.get();
            Identification identification = Identification.builder()
                    .image(image)
                    .species(species)
                    .confidence(response.getConfidence())
                    .identificationDate(LocalDateTime.now())
                    .build();
            identificationRepository.save(identification);

            return ImageDtoOut.builder()
                    .imageId(image.getImageId())
                    .photoUrl(image.getPhotoUrl())
                    .espece(response.getEspece())
                    .confidence(response.getConfidence())
                    .identificationDate(identification.getIdentificationDate())
                    .description(response.getDescription())
                    .famille(response.getFamille())
                    .funFact(response.getFunFact())
                    .habitat(response.getHabitat())
                    .nomLatin(response.getNomLatin())
                    .region(response.getRegion())
                    .taille(response.getTaille())
                    .build();

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du traitement de l'image", e);
        }
    }
}
