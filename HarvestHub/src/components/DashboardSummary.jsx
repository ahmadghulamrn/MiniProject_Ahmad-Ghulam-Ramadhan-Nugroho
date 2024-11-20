const DashboardSummary = ({ totalPoints, totalPosts }) => {
  return (
    <div className="max-w-7xl mx-auto mt-7">
      <h2 className="text-4xl font-semibold text-green-500 mb-6 text-center">
        Dashboard Summary
      </h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Total Poin */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 shadow-xl p-6 rounded-lg text-white text-center">
          <h3 className="text-lg font-medium mb-2">Total Poin</h3>
          <p className="text-3xl font-bold">{totalPoints}</p>
        </div>

        {/* Total Postingan */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 shadow-xl p-6 rounded-lg text-white text-center">
          <h3 className="text-lg font-medium mb-2">Total Postingan</h3>
          <p className="text-3xl font-bold">{totalPosts}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
