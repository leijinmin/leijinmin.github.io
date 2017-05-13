using System.Windows;
using System.Text.RegularExpressions;


namespace StrategyPattern
{
    /// <summary>
    /// Logique d'interaction pour MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private AbstractStructureStrategy arrayStrategy = new ArrayStrategy();
        private AbstractStructureStrategy queueStrategy = new QueueStrategy();
        private AbstractStructureStrategy stackStrategy = new StackStrategy();
        private AbstractStructureStrategy hashStrategy = new DictionaryStrategy();

        public MainWindow()
        {
            InitializeComponent();
            changeButtonStatus(true);
        }
       /// <summary>
       /// Active or disactive the buttons
       /// </summary>
       /// <param name="isEmpty">flag indicating whether the structure is empty or not</param>
        private void changeButtonStatus(bool isEmpty)
        {
            if (isEmpty)
            {
                this.searchByNameBtn.IsEnabled = false;
                this.searchByEmailBtn.IsEnabled = false;
                this.sortBtn.IsEnabled = false;
                this.showBtn.IsEnabled = false;
            }
            else
            {
                this.searchByNameBtn.IsEnabled = true;
                this.searchByEmailBtn.IsEnabled = true;
                this.sortBtn.IsEnabled = true;
                this.showBtn.IsEnabled = true;
            }
        }
        /// <summary>
        /// Get the strategy in accordance with the radio selected
        /// </summary>
        /// <returns>The corresponding structure</returns>
        private AbstractStructureStrategy getStrategy()
        {
            if ((bool)this.arrayRd.IsChecked)
            {
                return this.arrayStrategy;
            }
            else if ((bool)this.stackRd.IsChecked)
            {
                return this.stackStrategy;
            }
            else if ((bool)this.queueRd.IsChecked)
            {
                return this.queueStrategy;
            }
            else
            {
                return this.hashStrategy ;
            }
        }
             
        private void ajouterBtn_Click(object sender, RoutedEventArgs e)
        {
            if (this.nameTB.Text.Trim() == "" || this.emailTB.Text.Trim() == "") {
                MessageBox.Show("The name or e-mail is empty!");
                return;
            }
            if (getStrategy().Contains(this.nameTB.Text.Trim(),this.emailTB.Text.Trim()))
            {
                MessageBox.Show("The name or e-mail already exists!");
                return;
            }
            if (!Regex.IsMatch(this.emailTB.Text.Trim(), @"^([a-zA-z]+)\w*@(\w+)\.([a-zA-z]+)"))
            {
                MessageBox.Show("The format of the E-mail is incorrect!");
                return;
            }

            AbstractStructureStrategy strategy = getStrategy();           
            strategy.Add(this.nameTB.Text.Trim(), this.emailTB.Text.Trim());
            changeButtonStatus(false);
        }

        private void bouton_Checked(object sender, RoutedEventArgs e)
        {
            changeButtonStatus(getStrategy().IsEmpty());
            if (this.showTB != null)
                this.showTB.Text = "";
        }

        private void searchByNameBtn_Click(object sender, RoutedEventArgs e)
        {
           this.showTB.Text = getStrategy().SearchByName(this.nameTB.Text.Trim());
        }

        private void showBtn_Click(object sender, RoutedEventArgs e)
        {
            this.showTB.Text = getStrategy().ShowAll();
        }

        private void sortBtn_Click(object sender, RoutedEventArgs e)
        {
            this.showTB.Text = getStrategy().Sort();
        }

        private void searchByEmailBtn_Click(object sender, RoutedEventArgs e)
        {
            this.showTB.Text = getStrategy().SearchByEmail(this.emailTB.Text.Trim());
        }

    }
}
