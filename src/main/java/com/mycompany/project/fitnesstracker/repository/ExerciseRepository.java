package com.mycompany.project.fitnesstracker.repository;

import com.mycompany.project.fitnesstracker.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ExerciseRepository extends JpaRepository<Exercise, String> {
}
