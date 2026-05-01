package com.teamtask.backend.service;

import com.teamtask.backend.dto.DashboardStatsDto;
import com.teamtask.backend.entity.Role;
import com.teamtask.backend.entity.Task;
import com.teamtask.backend.entity.TaskStatus;
import com.teamtask.backend.entity.User;
import com.teamtask.backend.repository.TaskRepository;
import com.teamtask.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public DashboardStatsDto getDashboardStats(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Task> tasks;
        if (user.getRole() == Role.ADMIN) {
            tasks = taskRepository.findAll();
        } else {
            tasks = taskRepository.findByAssignee(user);
        }

        long totalTasks = tasks.size();
        long completedTasks = tasks.stream().filter(t -> t.getStatus() == TaskStatus.DONE).count();
        long pendingTasks = tasks.stream().filter(t -> t.getStatus() != TaskStatus.DONE).count();
        
        LocalDate currentDate = LocalDate.now();
        long overdueTasks = tasks.stream()
                .filter(t -> t.getStatus() != TaskStatus.DONE && t.getDueDate().isBefore(currentDate))
                .count();

        return new DashboardStatsDto(totalTasks, completedTasks, pendingTasks, overdueTasks);
    }
}
