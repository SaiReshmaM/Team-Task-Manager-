package com.teamtask.backend.service;

import com.teamtask.backend.dto.AuthRequest;
import com.teamtask.backend.dto.AuthResponse;
import com.teamtask.backend.dto.SignupRequest;
import com.teamtask.backend.entity.Role;
import com.teamtask.backend.entity.User;
import com.teamtask.backend.repository.UserRepository;
import com.teamtask.backend.security.CustomUserDetails;
import com.teamtask.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse authenticateUser(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        String jwt = jwtUtil.generateJwtToken(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        return new AuthResponse(jwt, userDetails.getUsername(), userDetails.getUser().getRole().name());
    }

    public void registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        Role role = signUpRequest.getUsername().toLowerCase().startsWith("admin") ? Role.ADMIN : Role.MEMBER;

        User user = User.builder()
                .username(signUpRequest.getUsername())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);
    }
}
