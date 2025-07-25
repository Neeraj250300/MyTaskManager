package com.example.Task.Manageer.repository;
import com.example.Task.Manageer.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {
}
