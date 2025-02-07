import Layout from "@/components/Layout";
import React, {useState} from "react";
import {useAuth} from '@/context/AuthContext'
import {useRouter} from 'next/router'
import Link from 'next/link'
import LoadingScreen from "@/components/LoadingScreen";

import { Menu, X, ChevronDown, Search, Layout as LayoutIcon } from 'lucide-react';

export default function Home() {
    const {user, loading} = useAuth()
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const router = useRouter()
    if (loading) return <LoadingScreen/>
    if (!user) return null

    const templates = [
        {
            id: 'modern',
            name: "Classic",
            image: "/templates/demo-1.png",
            description: "Traditional format ideal for experienced professionals"
        },
        {
            id: 'creative',
            name: "Creative",
            image: "/templates/demo-2.png",
            description: "Traditional format ideal for experienced professionals"
        },
        {
            id: 'professional',
            name: "Professional",
            image: "/templates/demo-3.png",
            description: "Stand out with a unique and bold layout with beautiful layout"
        },
    ]
    router.push('/builder?templateId=modern')
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Create Your Professional Resume
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            Choose from our collection of professionally designed templates
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                            <Link
                                href={`/builder?templateId=classic`}
                                className="px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors text-lg font-semibold"
                            >
                                Create Resume Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Search and Filter */}
                    <div className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/*<div className="relative w-full md:w-96">*/}
                        {/*    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        placeholder="Search templates..."*/}
                        {/*        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-600 focus:border-transparent"*/}
                        {/*        value={searchTerm}*/}
                        {/*        onChange={(e) => setSearchTerm(e.target.value)}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="relative">*/}
                        {/*    <select*/}
                        {/*        className="appearance-none bg-white border border-gray-300 rounded-full px-6 py-2 pr-10 focus:ring-2 focus:ring-blue-600 focus:border-transparent"*/}
                        {/*        value={selectedCategory}*/}
                        {/*        onChange={(e) => setSelectedCategory(e.target.value)}*/}
                        {/*    >*/}
                        {/*        <option>All Templates</option>*/}
                        {/*        <option>Creative</option>*/}
                        {/*        <option>Professional</option>*/}
                        {/*        <option>Modern</option>*/}
                        {/*        <option>Simple</option>*/}
                        {/*    </select>*/}
                        {/*    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />*/}
                        {/*</div>*/}
                    </div>

                    {/* Templates Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.map((template) => (
                            <div key={template.id}
                                 className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-96">
                                    <img
                                        src={template.image}
                                        alt={template.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <Link
                                            href={`/builder?templateId=${template.id}`}
                                            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Use This Template
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {template.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {template.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
