package com.teamtask.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.Set;

@Data
public class ProjectDto {
    private Long id;
    
    @NotBlank(message = "Project name cannot be blank")
    private String name;
    
    private String description;
    
    private Set<String> memberUsernames;
}
