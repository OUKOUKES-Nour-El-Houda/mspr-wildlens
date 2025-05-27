package com.wildlens.wildlesnApi.wildlensApi.controller;
import com.wildlens.wildlesnApi.wildlensApi.configuration.ExceptionHandlerConfiguration;
import com.wildlens.wildlesnApi.wildlensApi.configuration.ControllerConfiguration.*;
import com.wildlens.wildlesnApi.wildlensApi.controller.in.UserDtoIn;
import com.wildlens.wildlesnApi.wildlensApi.controller.out.UserDtoOut;
import com.wildlens.wildlesnApi.wildlensApi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

import static com.wildlens.wildlesnApi.wildlensApi.configuration.ControllerConfiguration.getCollectionResponseEntity;
import static org.springframework.http.HttpStatus.CREATED;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping(value = "/Users")
    @Operation(summary = "Endpoint to get list of users", description = "Endpoint to get list of users")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "users list found", content = {@Content(array = @ArraySchema(schema = @Schema(implementation = UserDtoOut.class)))}),
            @ApiResponse(responseCode = "204", description = "No components type found", content = @Content(schema = @Schema()))
    })
    public ResponseEntity<Collection<UserDtoOut>> getAllUser() {
        return ResponseEntity.ok(userService.getAllUser());

    }

        @ResponseStatus(CREATED)
    @PostMapping("/register")
    @Operation(summary = "Endpoint to add a new user", description = "Endpoint to add a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "user added", content = {@Content(schema = @Schema(implementation = UserDtoOut.class))}),
            @ApiResponse(responseCode = "406", description = "Duplicate name", content = {@Content(schema = @Schema(implementation = ExceptionHandlerConfiguration.ErrorResponse.class))})
    })
    public UserDtoOut createUser(@RequestBody UserDtoIn userDtoIn) {
        return userService.createUser(userDtoIn);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> request) {
        String mail_user = request.get("mail_user");
        String password = request.get("password");
        String response = userService.authenticate(mail_user, password);
        if (response.equals("User authenticated successfully")) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

}
