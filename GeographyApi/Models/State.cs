namespace GeographyApi.Models
{
    public class State
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }

        public long CountryId { get; set; }
        public Country Country { get; set; }


    }
}