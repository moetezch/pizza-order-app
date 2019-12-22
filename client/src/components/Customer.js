import React from 'react'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router-dom'

export default function Customer({ costumerDetails, addCostumerDetails }) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: costumerDetails.name || '',
      mobileNumber: costumerDetails.mobileNumber || '',
      address: costumerDetails.address || '',
      city: costumerDetails.city || '',
      zipCode: costumerDetails.zipCode || '',
    },
  })

  const history = useHistory()
  const onSubmit = data => {
    addCostumerDetails(data)
    history.push('/pizzas')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='field'>
        <label className='label'>Name</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='Name'
            name='name'
            ref={register({
              required: 'name is required',
              minLength: {
                value: 3,
                message: 'Min length is 3',
              },
              maxLength: {
                value: 80,
                message: 'Max length is 80',
              },
            })}
          />
        </div>
        <p className='help is-danger'> {errors.name && errors.name.message}</p>
      </div>

      <div className='field'>
        <label className='label'>Mobile number</label>
        <div className='control'>
          <input
            className='input'
            type='number'
            placeholder='Mobile number'
            name='mobileNumber'
            ref={register({
              required: 'mobile number is required',
              minLength: {
                value: 8,
                message: 'Min is 8',
              },
            })}
          />
        </div>
        <p className='help is-danger'>
          {' '}
          {errors.mobileNumber && errors.mobileNumber.message}
        </p>
      </div>

      <div className='field'>
        <label className='label'>Address</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='Address'
            name='address'
            ref={register({
              required: 'address is required',
              minLength: {
                value: 3,
                message: 'Min length is 3',
              },
              maxLength: {
                value: 100,
                message: 'Max length is 100',
              },
            })}
          />
        </div>
        <p className='help is-danger'>
          {' '}
          {errors.address && errors.address.message}
        </p>
      </div>

      <div className='field'>
        <label className='label'>City</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='City'
            name='city'
            ref={register({
              required: 'city is required',
              minLength: {
                value: 3,
                message: 'Min length is 2',
              },
              maxLength: {
                value: 80,
                message: 'Max length is 2',
              },
            })}
          />
        </div>
        <p className='help is-danger'> {errors.city && errors.city.message}</p>
      </div>

      <div className='field'>
        <label className='label'>Zip code</label>
        <div className='control'>
          <input
            className='input'
            type='number'
            placeholder='Zip code'
            min='1'
            name='zipCode'
            ref={register({ required: 'zip code is required' })}
          />
        </div>
        <p className='help is-danger'>
          {' '}
          {errors.zipCode && errors.zipCode.message}
        </p>
      </div>

      <div className='field'>
        <div className='control'>
          <button className='button is-link is-pulled-right' type='submit'>
            Next
          </button>
        </div>
      </div>
    </form>
  )
}
