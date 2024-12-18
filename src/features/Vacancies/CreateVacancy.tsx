import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
  FormGroup,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";
import { createVacancy } from '../../api/vacancies';

interface Position {
  _id: string;
  name: string;
}

interface Employer {
  _id: string;
  name: string;
}

interface Locality {
  _id: string;
  name: string;
}

export interface FormInputs {
  title: string;
  employer: string;
  location: string;
  employmentType: string;
  salary: number;
  schedule: string;
  responsibilities: string;
  educationRequirements: string;
  hasHigherEducation: boolean;
  educationDegree?: string | null;
  hasExperience: boolean;
  experience?: string | null;
  contactDetails: {
    phone: string;
    email: string;
  };
  active: boolean;
}

const EMPLOYMENT_TYPES = [
  "Повна зайнятість",
  "Часткова зайнятість",
  "Сезонна робота",
  "Дистанційна робота",
];

const EDUCATION_DEGREES = ["Молодший спеціаліст", "Бакалавр", "Магістр"];

const EXPERIENCE_OPTIONS = ["1 рік", "2 роки", "3 роки", "3+ років"];

export function CreateVacancy() {
  const navigate = useNavigate();
  const [positions, setPositions] = useState<Position[]>([]);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchInProgress = useRef(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      employer: "",
      location: "",
      employmentType: "",
      salary: 0,
      schedule: "",
      responsibilities: "",
      educationRequirements: "",
      hasHigherEducation: false,
      educationDegree: "",
      hasExperience: false,
      experience: "",
      active: true,
      contactDetails: {
        phone: "",
        email: "",
      },
    },
  });


  const hasHigherEducation = watch("hasHigherEducation");
  const hasExperience = watch("hasExperience");

  useEffect(() => {
    const fetchReferenceData = async () => {
      if (fetchInProgress.current) return; // Перевіряємо, чи запит вже виконується
      fetchInProgress.current = true; // Встановлюємо статус виконання запиту

      try {
        const [positionsRes, employersRes, localitiesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/positions`),
          axios.get(`${API_BASE_URL}/employers`),
          axios.get(`${API_BASE_URL}/localities`),
        ]);

        setPositions(positionsRes.data);
        setEmployers(employersRes.data);
        setLocalities(localitiesRes.data);
      } catch (err) {
        setSubmitError("Failed to load reference data");
      } finally {
        setLoading(false);
        fetchInProgress.current = false; // Скидаємо статус виконання запиту
      }
    };

    fetchReferenceData();
  }, []);

  const onSubmit = async (data: FormInputs) => {
    const transformedData = {
      ...data,
      educationDegree: data.hasHigherEducation ? data.educationDegree : null,
      experience: data.hasExperience ? data.experience : null,
    };

    try {
      const response = await createVacancy(transformedData as FormInputs);
      if (response.error) {
        setSubmitError(response.error);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        navigate("/vacancies");
      }, 2000);
    } catch (error) {
      setSubmitError("Failed to create vacancy");
    }
  };



  if (loading) {
    return <Container><Typography>Loading...</Typography></Container>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ pt: 2 }}>
          Створити нову вакансію
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Position */}
            <Grid item xs={12} md={6}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Оберіть посаду" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    value={positions.find(p => p._id === field.value) || null}
                    options={positions}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    onChange={(_, value) => field.onChange(value?._id || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Посада"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Employer */}
            <Grid item xs={12} md={6}>
              <Controller
                name="employer"
                control={control}
                rules={{ required: "Оберіть роботодавця" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    value={employers.find(e => e._id === field.value) || null}
                    options={employers}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    onChange={(_, value) => field.onChange(value?._id || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Роботодавець"
                        error={!!errors.employer}
                        helperText={errors.employer?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12} md={6}>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Оберіть місце виконання робіт" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    value={localities.find(l => l._id === field.value) || null}
                    options={localities}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    onChange={(_, value) => field.onChange(value?._id || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Місце виконання робіт"
                        error={!!errors.location}
                        helperText={errors.location?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Employment Type */}
            <Grid item xs={12} md={6}>
              <Controller
                name="employmentType"
                control={control}
                rules={{ required: "Оберіть тип зайнятості" }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.employmentType}>
                    <InputLabel>Тип зайнятості</InputLabel>
                    <Select {...field} label="Тип зайнятості">
                      {EMPLOYMENT_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.employmentType && (
                      <FormHelperText>{errors.employmentType.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Salary */}
            <Grid item xs={12} md={6}>
              <Controller
                name="salary"
                control={control}
                rules={{
                  required: "Вкажіть зарплату",
                  min: { value: 0, message: "Зарплата не може бути від'ємною" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Зарплата"
                    type="number"
                    error={!!errors.salary}
                    helperText={errors.salary?.message}
                  />
                )}
              />
            </Grid>

            {/* Schedule */}
            <Grid item xs={12} md={6}>
              <Controller
                name="schedule"
                control={control}
                rules={{ required: "Вкажіть графік роботи" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Графік роботи"
                    error={!!errors.schedule}
                    helperText={errors.schedule?.message}
                  />
                )}
              />
            </Grid>

            {/* Responsibilities */}
            <Grid item xs={12}>
              <Controller
                name="responsibilities"
                control={control}
                rules={{ required: "Опишіть обов'язки" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Функціональні обов'язки"
                    error={!!errors.responsibilities}
                    helperText={errors.responsibilities?.message}
                  />
                )}
              />
            </Grid>

            {/* Education Requirements */}
            <Grid item xs={12}>
              <Controller
                name="educationRequirements"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Вимоги до освіти"
                  />
                )}
              />
            </Grid>

            {/* Higher Education */}
            <Grid item xs={12}>
              <FormGroup>
                <Controller
                  name="hasHigherEducation"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch {...field} checked={field.value} />}
                      label="Вимагається вища освіта"
                    />
                  )}
                />
              </FormGroup>
            </Grid>

            {/* Conditional Education Degree */}
            {hasHigherEducation && (
              <Grid item xs={12} md={6}>
                <Controller
                  name="educationDegree"
                  control={control}
                  rules={{ required: "Оберіть ступінь освіти" }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.educationDegree}>
                      <InputLabel>Ступінь освіти</InputLabel>
                      <Select {...field} label="Ступінь освіти">
                        {EDUCATION_DEGREES.map((degree) => (
                          <MenuItem key={degree} value={degree}>
                            {degree}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.educationDegree && (
                        <FormHelperText>{errors.educationDegree.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            )}

            {/* Experience Section */}
            <Grid item xs={12}>
              <FormGroup>
                <Controller
                  name="hasExperience"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch {...field} checked={field.value} />}
                      label="Потребується досвід роботи"
                    />
                  )}
                />
              </FormGroup>
            </Grid>

            {/* Conditional Experience */}
            {hasExperience && (
              <Grid item xs={12} md={6}>
                <Controller
                  name="experience"
                  control={control}
                  rules={{ required: "Оберіть кількість досвіду" }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.experience}>
                      <InputLabel>Досвід роботи</InputLabel>
                      <Select {...field} label="Досвід роботи">
                        {EXPERIENCE_OPTIONS.map((exp) => (
                          <MenuItem key={exp} value={exp}>
                            {exp}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.experience && (
                        <FormHelperText>{errors.experience.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            )}

            {/* Contact Details */}
            <Grid item xs={12} md={6}>
              <Controller
                name="contactDetails.phone"
                control={control}
                rules={{ required: "Вкажіть телефон" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Телефон"
                    error={!!errors.contactDetails?.phone}
                    helperText={errors.contactDetails?.phone?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="contactDetails.email"
                control={control}
                rules={{
                  required: "Вкажіть email",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Некоректний email",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    error={!!errors.contactDetails?.email}
                    helperText={errors.contactDetails?.email?.message}
                  />
                )}
              />
            </Grid>

            {/* Active */}
            <Grid item xs={12}>
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label="Опублікувати вакансію"
                  />
                )}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Створити вакансію
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Вакансію успішно створено!</Alert>
      </Snackbar>

      <Snackbar
        open={!!submitError}
        autoHideDuration={6000}
        onClose={() => setSubmitError(null)}
      >
        <Alert severity="error">{submitError}</Alert>
      </Snackbar>
    </Container>
  );
}
