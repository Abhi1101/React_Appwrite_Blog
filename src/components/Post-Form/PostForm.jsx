import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, RTE, Input, Select } from '../index'
import service from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post ? post.title : '',
            slug: post ? post.slug : '',
            content: post ? post.content : '',
            status: post? post.status : 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.authSlice.userData);



    const submit = async (data) => {


        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                await service.deleteFile(post.featuredImage)
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
            }
            else {
                
                console.log("testcode | postform.jsx | inside else block , ");

                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await service.createPost({
                        ...data,
                        userId: userData.$id,
                    })

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }

            }
        

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value == 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return '';

    }, [])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {
                    shouldValidate: true,
                })
            }
        })


        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])






    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label='Title :'
                    placeholder='Title'
                    className='mb-4'
                    {...register('title', {
                        required: true,
                    })}
                />

                <Input
                    label="Slug :"
                    placeholder='Slug'
                    className='mb-4'
                    {...register('slug', { required: true, })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true, });
                    }}
                />

                <RTE
                    label='content :'
                    name='content'
                    control={control}
                    defaultValue={setValue('content')}
                />

            </div>
            
            <div className="w-1/3 px-2">
                <Input
                label='Featured image'
                type='file'
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register('image', { required: !post, })}
                />

                {
                    post && (
                        <div className="w-full mb-4">
                            <img 
                            src={`https://nyc.cloud.appwrite.io/v1/storage/buckets/691b343400292108d031/files/${post.featuredImage}/view?project=691b2a96003e6f9ded7c&mode=admin`} 
                            // src={service.getFilePreview(post.featuredImage)} 
                            alt={post.title}
                            className='rounded-lg' 
                            />
                        </div>
                    )
                
                }

                <Select
                label='status'
                options={['active', 'inactive']}
                className='mb-4'
                {...register('status', { required: true ,})}

                />

                <Button
                type='submit'
                bgColor={post ? "bg-green-500" : undefined} 
                className="w-full"
                >
                {post ? "Update" : "Submit"}    
                 </Button>    

            </div>

               
        </form>
    )
}

export default PostForm
