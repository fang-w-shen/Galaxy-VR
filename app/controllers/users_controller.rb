class UsersController < ApplicationController
	before_action :logged_in_user, only: [:index, :edit, :update, :destroy, :following, :followers]
	before_action :correct_user,   only: [:edit, :update]
	before_action :admin_user,     only: :destroy

	def index
		if params[:search]
			@users = User.search(params[:search]).where(activated: true).order(:name).paginate(page: params[:page])
		else
			@users = User.where(activated: true).order(:name).paginate(page: params[:page])
		end
	end

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if @user.save
			@user.send_activation_email
			flash[:info] = "Please check your email to activate your account."
			redirect_to root_url
		else
			render 'new'
		end
	end

	def edit
		@user = User.find(params[:id])
	end
	def show
		@user = User.find(params[:id])
		@posts = @user.posts.paginate(page: params[:page], per_page: 20)
	end
	def update
		@user = User.find(params[:id])
		if @user.update_attributes(user_params)
			flash[:success] = "Profile updated"
			redirect_to @user
		else
			render 'edit'
		end
	end

	def destroy
		User.find(params[:id]).destroy
		flash[:success] = "User deleted"
		redirect_to users_url
	end
	def following
		@title = "Following"
		@user  = User.find(params[:id])
		@users = @user.following.order(:name).paginate(page: params[:page])
		render 'show_follow'
	end

	def followers
		@title = "Followers"
		@user  = User.find(params[:id])
		@users = @user.followers.order(:name).paginate(page: params[:page])
		render 'show_follow'
	end

	private

	def user_params
		params.require(:user).permit(:name, :email, :password,
			:password_confirmation, :term)
	end

	def correct_user
		@user = User.find(params[:id])
		redirect_to(root_url) unless current_user?(@user)
	end

	def admin_user
		redirect_to(root_url) unless current_user.admin?
	end
end
