package com.teamtask.backend.service;

import com.teamtask.backend.dto.TaskDto;
import com.teamtask.backend.entity.Project;
import com.teamtask.backend.entity.Role;
import com.teamtask.backend.entity.Task;
import com.teamtask.backend.entity.TaskStatus;
import com.teamtask.backend.entity.User;
import com.teamtask.backend.repository.ProjectRepository;
import com.teamtask.backend.repository.TaskRepository;
import com.teamtask.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public List<TaskDto> getAllTasks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole() == Role.ADMIN) {
            return taskRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
        } else {
            return taskRepository.findByAssignee(user).stream().map(this::mapToDto).collect(Collectors.toList());
        }
    }

    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return mapToDto(task);
    }

    @Transactional
    public TaskDto createTask(TaskDto taskDto) {
        Project project = projectRepository.findById(taskDto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(TaskStatus.TODO);
        task.setDueDate(taskDto.getDueDate());
        task.setProject(project);

        if (taskDto.getAssigneeUsername() != null && !taskDto.getAssigneeUsername().isEmpty()) {
            User assignee = userRepository.findByUsername(taskDto.getAssigneeUsername())
                    .orElseThrow(() -> new RuntimeException("Assignee not found"));
            task.setAssignee(assignee);
        }

        return mapToDto(taskRepository.save(task));
    }

    @Transactional
    public TaskDto updateTask(Long id, TaskDto taskDto, String username) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == Role.MEMBER) {
            if (task.getAssignee() == null || !task.getAssignee().getId().equals(user.getId())) {
                throw new RuntimeException("Members can only update their assigned tasks");
            }
            // Members can only update status
            if (taskDto.getStatus() != null) {
                task.setStatus(taskDto.getStatus());
            }
        } else {
            // ADMIN can update everything
            task.setTitle(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());
            if (taskDto.getStatus() != null) task.setStatus(taskDto.getStatus());
            task.setDueDate(taskDto.getDueDate());
            
            if (taskDto.getAssigneeUsername() != null && !taskDto.getAssigneeUsername().isEmpty()) {
                User assignee = userRepository.findByUsername(taskDto.getAssigneeUsername())
                        .orElseThrow(() -> new RuntimeException("Assignee not found"));
                task.setAssignee(assignee);
            } else {
                task.setAssignee(null);
            }
        }
        
        return mapToDto(taskRepository.save(task));
    }

    @Transactional
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    private TaskDto mapToDto(Task task) {
        TaskDto dto = new TaskDto();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setDueDate(task.getDueDate());
        dto.setProjectId(task.getProject().getId());
        if (task.getAssignee() != null) {
            dto.setAssigneeUsername(task.getAssignee().getUsername());
        }
        return dto;
    }
}
