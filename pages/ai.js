"use client"
import React, { useState } from 'react';
import { FaLeaf, FaVial, FaCalendarAlt, FaStickyNote } from 'react-icons/fa';

const timelineData = [
	{
		giaiDoan: 'Giai đoạn 1',
		entries: [
			{
				congViec: 'Bón phân',
				loaiPhan: 'NPK',
				tenPhan: 'Phân bón NPK 20-20-15',
				ngayThucHien: '2023-05-01',
				ghiChu: 'Bón phân đều xung quanh gốc cây'
			},
			{
				congViec: 'Phun thuốc',
				loaiThuoc: 'Thuốc trừ sâu',
				tenThuoc: 'Abamectin 1.8 EC',
				ngayThucHien: '2023-05-05',
				ghiChu: 'Phun đều lên lá và thân cây'
			}
		]
	},
	{
		giaiDoan: 'Giai đoạn 2',
		entries: [
			{
				congViec: 'Bón phân',
				loaiPhan: 'Hữu cơ',
				tenPhan: 'Phân hữu cơ vi sinh',
				ngayThucHien: '2023-06-15',
				ghiChu: 'Bón phân kết hợp với tưới nước'
			},
			{
				congViec: 'Phun thuốc',
				loaiThuoc: 'Thuốc kích thích tăng trưởng',
				tenThuoc: 'Gibberellic Acid',
				ngayThucHien: '2023-06-20',
				ghiChu: 'Phun vào buổi sáng sớm'
			}
		]
	}
];

const Timeline = () => {
	const [selectedEntry, setSelectedEntry] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

	const filteredData = timelineData.filter(stage =>
		stage.giaiDoan.toLowerCase().includes(searchTerm.toLowerCase()) ||
		stage.entries.some(entry =>
			entry.congViec.toLowerCase().includes(searchTerm.toLowerCase()) ||
			entry.loaiPhan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			entry.tenPhan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			entry.loaiThuoc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			entry.tenThuoc?.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	const handleEntryClick = (entry) => {
		setSelectedEntry(entry);
	};

	const handleCloseModal = () => {
		setSelectedEntry(null);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-center">Timeline Công Việc</h1>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Tìm kiếm giai đoạn hoặc công việc..."
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			{filteredData.map((stage, index) => (
				<div key={index} className="mb-12">
					<h2 className="text-2xl font-semibold mb-4 bg-blue-100 p-2 rounded">{stage.giaiDoan}</h2>
					<div className="space-y-6">
						{stage.entries.map((entry, entryIndex) => (
							<div
								key={entryIndex}
								className="flex items-start bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
								onClick={() => handleEntryClick(entry)}
							>
								<div className="flex-shrink-0 mr-4">
									{entry.congViec === 'Bón phân' ? (
										<FaLeaf className="text-3xl text-green-500" />
									) : (
										<FaVial className="text-3xl text-purple-500" />
									)}
								</div>
								<div className="flex-grow">
									<h3 className="text-lg font-semibold mb-2">{entry.congViec}</h3>
									<p className="text-sm text-gray-600 mb-1">
										{entry.loaiPhan || entry.loaiThuoc}: {entry.tenPhan || entry.tenThuoc}
									</p>
									<div className="flex items-center text-sm text-gray-500">
										<FaCalendarAlt className="mr-1" />
										<span>{entry.ngayThucHien}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}

			{selectedEntry && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg p-6 max-w-md w-full">
						<h3 className="text-xl font-semibold mb-4">{selectedEntry.congViec}</h3>
						<p className="mb-2">
							<strong>{selectedEntry.loaiPhan || selectedEntry.loaiThuoc}:</strong> {selectedEntry.tenPhan || selectedEntry.tenThuoc}
						</p>
						<p className="mb-2">
							<strong>Ngày thực hiện:</strong> {selectedEntry.ngayThucHien}
						</p>
						<div className="flex items-start mb-4">
							<FaStickyNote className="text-yellow-500 mr-2 mt-1" />
							<p><strong>Ghi chú:</strong> {selectedEntry.ghiChu}</p>
						</div>
						<button
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
							onClick={handleCloseModal}
						>
							Đóng
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Timeline;