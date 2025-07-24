
import Button from "@/Ui/Button";

const DeleteAccount = () => {
  return (
    <div className="flex items-center justify-between border border-gray-300 p-6 rounded-lg bg-red-50">
      <div className="space-y-2 max-w-3xl">
        <h2 className="text-2xl font-bold text-red-700">Delete Account</h2>
        <p className="text-gray-700">
          By deleting your account, all of your data will be permanently
          removed. Please download any important information before proceeding.
        </p>
      </div>
      <Button className="px-6 py-3 bg-[#DC3545] text-white rounded-md">
        DELETE
      </Button>
    </div>
  );
};

export default DeleteAccount;
