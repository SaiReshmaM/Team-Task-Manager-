package com.teamtask.backend.dto;

import com.teamtask.backend.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class TaskDto {
    private Long id;

    @NotBlank(message = "Task title cannot be blank")
    private String title;

    private String description;

    private TaskStatus status;

    @NotNull(message = "Due date cannot be null")
    private LocalDate dueDate;

    @NotNull(message = "Project ID cannot be null")
    private Long projectId;

    private String assigneeUsername;
}
