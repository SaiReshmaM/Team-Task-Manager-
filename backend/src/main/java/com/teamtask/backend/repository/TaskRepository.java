package com.teamtask.backend.repository;

import com.teamtask.backend.entity.Task;
import com.teamtask.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignee(User assignee);
}
