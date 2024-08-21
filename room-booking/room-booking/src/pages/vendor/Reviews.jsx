import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import getRating from "../../services/vendor/RatignRooms"; // Adjust the import path as needed

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchReview = async () => {
    try {
      const response = await getRating();
    

      // Transforming the data
      const transformedData = response.flatMap((room) =>
        room.ratings.map((rating) => ({
          key: `${room.id}-${rating.id}`, 
          roomName: room.name,
          user: rating.user,
          rating: rating.rating,
          feedback: rating.feedback,
          created_at: rating.created_at,
        }))
      );

      setData(transformedData);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setError("Failed to load reviews.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      sorter: (a, b) => a.roomName.localeCompare(b.roomName),
      sortOrder: sortedInfo.columnKey === "roomName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      sorter: (a, b) => a.user.localeCompare(b.user),
      sortOrder: sortedInfo.columnKey === "user" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
      sortOrder: sortedInfo.columnKey === "rating" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      sortOrder:
        sortedInfo.columnKey === "created_at" ? sortedInfo.order : null,
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
  ];

  return (
    <main className="lg:p-4 w-auto">
     <header className="border-b-2 border-gray-400   h-16  lg:pl-4">
        <h1 className="text-3xl font-bold">
          All Reviews   
        </h1>
        
      </header>
      <Space style={{ marginBottom: 16, marginTop:16  }}>
        <Button
          onClick={() =>
            setSortedInfo({ order: "descend", columnKey: "rating" })
          }
        >
          Sort Rating
        </Button>
        <Button onClick={() => setFilteredInfo({})}>Clear filters</Button>
        <Button
          onClick={() => {
            setFilteredInfo({});
            setSortedInfo({});
          }}
        >
          Clear all
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        loading={loading}
        pagination={{ pageSize: 4 }}
      />
      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
};

export default ReviewsPage;
