import React from 'react'
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  FormErrorMessage,
  //   FormHelperText,
} from '@chakra-ui/react'
// import { Select } from 'chakra-react-select'
import Select, { MultiValue } from 'react-select'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getLanguages } from 'pages/api/db'

// import { IUser } from '../../types'

type FormValues = {
  uid: string
  userName: string
  userBio: string
  userSkills: { label: string; value: string }[]
}

type FormProps = {
  initialValues: {
    uid: string
    name: string
    skills?: { label: string; value: string }[]
    bio?: string
  }
  onSave: (data: FormValues) => {
    //something goes here
  }
}

interface IOptions {
  value: string
  label: string
}

const ProfileForm = (props: FormProps) => {
  // console.log(props.initialValues)

  const [languages, setLanguages] = React.useState<string[]>([])

  const { uid, name, bio, skills } = props.initialValues
  const schema = yup.object().shape({
    userName: yup
      .string()
      .min(6, 'Must be at least 6 characters')
      .required('Title is required'),
    userSkills: yup.array().min(1).required('Skills is required'),
    userBio: yup.string().required('Description is required'),
  })
  const {
    register,
    control,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { userName: name, userBio: bio, userSkills: skills },
  })
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = {
      ...data,
      uid,
    }
    props.onSave(formData)
  }

  React.useEffect(() => {
    const langOptions = getLanguages()
    // console.log(langOptions)
    setLanguages(langOptions)
  }, [])

  const languageOptions: IOptions[] = languages.map((option) => ({
    label: option,
    value: option,
  }))
  return (
    <VStack w="full" p="6" ml="10" boxShadow={'xl'} rounded={'lg'} spacing="4">
      <FormControl isInvalid={!!errors.userName}>
        <FormLabel htmlFor="userName">Name</FormLabel>
        <Input {...register('userName')} />
        {errors.userName && (
          <FormErrorMessage>{errors.userName.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.userSkills}>
        <FormLabel htmlFor="userSkills">
          What languages are you familiar with?
        </FormLabel>

        <Controller
          control={control}
          name="userSkills"
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                isMulti
                value={value}
                options={languageOptions}
                onChange={(newValue: MultiValue<IOptions>) => {
                  console.log(newValue)
                  onChange(newValue)
                }}
                closeMenuOnSelect={false}
              />
            )
          }}
        />
      </FormControl>

      <FormControl isInvalid={!!errors.userBio}>
        <FormLabel htmlFor="userBio">Tell us about yourself</FormLabel>
        <Textarea {...register('userBio')} />
        {errors.userBio && (
          <FormErrorMessage>{errors.userBio.message}</FormErrorMessage>
        )}
      </FormControl>
      {isSubmitting ? 'submitting' : 'nothing happenign'}
      <Button
        mt="6"
        isLoading={isSubmitting}
        loadingText="Saving..."
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Save Changes
      </Button>
    </VStack>
  )
}

export default ProfileForm
