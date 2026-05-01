package com.teamtask.backend.controller;

import com.teamtask.backend.dto.MessageResponse;
import com.teamtask.backend.dto.ProjectDto;
import com.teamtask.backend.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(@Valid @RequestBody ProjectDto projectDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(projectDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectDto projectDto) {
        return ResponseEntity.ok(projectService.updateProject(id, projectDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(new MessageResponse("Project deleted successfully"));
    }

    @PostMapping("/{projectId}/members/{username}")
    public ResponseEntity<ProjectDto> addMember(@PathVariable Long projectId, @PathVariable String username) {
        return ResponseEntity.ok(projectService.addMemberToProject(projectId, username));
    }

    @DeleteMapping("/{projectId}/members/{username}")
    public ResponseEntity<ProjectDto> removeMember(@PathVariable Long projectId, @PathVariable String username) {
        return ResponseEntity.ok(projectService.removeMemberFromProject(projectId, username));
    }
}
