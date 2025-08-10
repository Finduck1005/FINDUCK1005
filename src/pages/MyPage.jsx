import { useState } from "react";
import { Camera, Edit3, Menu, X, Heart, Eye } from "lucide-react";

export default function MyPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("selling");

  const userProfile = {
    nickname: "TechEnthusiast_2024",
    fullName: "Alex Johnson",
    profileImage: "/placeholder.svg?height=120&width=120",
    bio: "Passionate about technology, gadgets, and finding the best deals online. Love sharing product reviews and recommendations!",
    link: "https://open.kakao.com/o/spYO7rLh",
  };

  const mySellingPosts = [
    {
      id: "sell_1",
      name: "Nike Air Jordan 1 Retro High OG 'Chicago' 2015",
      price: "$385",
      condition: "New",
      size: "US 9",
      image: "/placeholder.svg?height=220&width=320",
      hearts: 1247,
      views: 127,
      timePosted: "2 hours ago",
      location: "San Francisco, CA",
    },
    {
      id: "sell_6",
      name: "Nike Air Jordan 4 Retro 'White Cement' 2016",
      price: "$295",
      condition: "Used - Excellent",
      size: "US 10",
      image: "/placeholder.svg?height=220&width=320",
      hearts: 892,
      views: 89,
      timePosted: "1 day ago",
      location: "San Francisco, CA",
    },
    {
      id: "sell_7",
      name: "Nike Air Jordan 11 Retro 'Bred' 2019",
      price: "$450",
      condition: "New",
      size: "US 9.5",
      image: "/placeholder.svg?height=220&width=320",
      hearts: 1456,
      views: 203,
      timePosted: "3 days ago",
      location: "San Jose, CA",
    },
  ];

  const myBuyingPosts = [
    {
      id: "buy_1",
      title: "WTB: Jordan 1 Retro High OG 'Chicago' 2015",
      sizeWanted: "US 9",
      conditionPreference: "Any",
      maxBudget: "$350",
      timePosted: "1 hour ago",
      location: "San Francisco Bay Area",
      hearts: 56,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Section (trimmed per request) */}
          <aside className="xl:col-span-1">
            <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={
                      userProfile.profileImage ||
                      "/placeholder.svg?height=120&width=120&query=profile-avatar"
                    }
                    alt="Profile avatar"
                    width={120}
                    height={120}
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full mx-auto mb-4 border-4 border-blue-100 object-cover"
                  />
                  <button
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-600 text-white p-1.5 sm:p-2 rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Change profile photo"
                  >
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>

                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 break-words">
                  {userProfile.nickname}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  {userProfile.fullName}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 px-2">
                  {userProfile.bio}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 px-2">
                  {userProfile.link}
                </p>
                <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center text-sm sm:text-base">
                  <Edit3 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </section>
          </aside>

          {/* My Posts Section */}
          <section className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    My Posts
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Selling: {mySellingPosts.length} • Buying:{" "}
                    {myBuyingPosts.length}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "selling"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600"
                      }`}
                      onClick={() => setActiveTab("selling")}
                    >
                      Selling
                    </button>
                    <button
                      className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        activeTab === "buying"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600"
                      }`}
                      onClick={() => setActiveTab("buying")}
                    >
                      Buying
                    </button>
                  </div>

                  <a
                    href="/sell/create"
                    className="hidden sm:inline-flex bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Create Selling Post
                  </a>
                </div>

                <a
                  href="/sell/create"
                  className="sm:hidden bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm self-start"
                >
                  Create Selling Post
                </a>
              </div>

              {/* Listings */}
              {activeTab === "selling" ? (
                mySellingPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {mySellingPosts.map((item) => (
                      <a
                        key={item.id}
                        href={`/post/${item.id}`}
                        className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow group"
                      >
                        <div className="relative mb-3 sm:mb-4">
                          <img
                            src={
                              item.image ||
                              "/placeholder.svg?height=220&width=320&query=item-image"
                            }
                            alt={item.name}
                            width={320}
                            height={220}
                            className="w-full h-40 sm:h-48 object-cover rounded-lg group-hover:scale-[1.02] transition-transform"
                          />
                          <span
                            className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full ${
                              item.condition === "New"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.condition}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm sm:text-base">
                            {item.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm text-gray-500">
                              Size: {item.size}
                            </span>
                            <span className="text-base sm:text-lg font-bold text-gray-800">
                              {item.price}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                              <span className="inline-flex items-center gap-1">
                                <Heart className="h-3.5 w-3.5 text-red-500 fill-current" />
                                {item.hearts}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Eye className="h-3.5 w-3.5 text-gray-500" />
                                {item.views}
                              </span>
                            </div>
                            <span>{item.timePosted}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            📍 {item.location}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-600">
                    <p className="mb-2">
                      You haven't posted any items for sale yet.
                    </p>
                    <a
                      href="/sell/create"
                      className="inline-flex bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Create your first selling post
                    </a>
                  </div>
                )
              ) : myBuyingPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {myBuyingPosts.map((post) => (
                    <a
                      key={post.id}
                      href={`/post/${post.id}`}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow group"
                    >
                      <div className="mb-2">
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          Looking to Buy
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Size Wanted:</span>
                          <span className="font-medium text-gray-800">
                            {post.sizeWanted}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Condition:</span>
                          <span className="font-medium text-gray-800">
                            {post.conditionPreference}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Max Budget:</span>
                          <span className="font-medium text-gray-800">
                            {post.maxBudget}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                        <span>📍 {post.location}</span>
                        <span>{post.timePosted}</span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-600">
                  <p>You haven't posted any buying requests yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
